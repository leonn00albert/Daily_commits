<?php
/*
Title: Network Ping Checker

Difficulty: Intermediate

Description:
Implement a PHP script that periodically checks the availability of a list of network hosts using ICMP ping requests. The script should be able to handle a list of hostnames or IP addresses provided as an array and output the status of each host (reachable or unreachable) along with the response time (if reachable). You can use the `ping` command-line utility or PHP's sockets for ICMP ping requests.

Challenge:
1. Create a PHP function `pingHosts(array $hosts)` that takes an array of hostnames or IP addresses as input and returns an array of results.
2. For each host in the input array, the function should send an ICMP ping request and record the response time (if reachable).
3. If a host is reachable, record the response time in milliseconds.
4. If a host is unreachable, mark it as unreachable in the results array.
5. Handle both IPv4 and IPv6 addresses.
6. Implement error handling for cases where the host is not reachable or an invalid IP address is provided.
7. You may use the `ping` command-line utility or PHP's sockets for ICMP ping requests, but provide a rationale for your choice.
8. Test your function with a variety of hostnames and IP addresses, including both reachable and unreachable hosts.
9. Optimize your solution for performance, considering potential delays in ICMP ping requests.

Example Usage:
```php
$hosts = array("google.com", "192.168.1.1", "invalidhost", "example.com");
$results = pingHosts($hosts);
print_r($results);

```
*/

class NetworkScanner {
    /**
     * @var array
     */
    private $hosts = [];

    /**
     * @var string|null
     */
    private $localIP;

    /**
     * NetworkScanner constructor.
     */
    public function __construct() {
        $this->localIP = $this->getLocalIP();
        $subnetRange = $this->getSubnetRange($this->localIP);
        $this->hosts = $this->generateHostsInRange($subnetRange[0], $subnetRange[1]);
    }

    /**
     * Get the local IP address.
     *
     * @return string|null
     */
    public function getLocalIP(): ?string {
        $output = shell_exec('ipconfig');
        if (preg_match('/Wireless LAN adapter WiFi:(.*?)IPv4 Address[^\n]*:\s*([^\s]+)/s', $output, $matches)) {
            return $matches[2];
        }
        return null;
    }

    /**
     * Get the range of IP addresses in the subnet.
     *
     * @param string $localIP
     * @return array
     */
    public function getSubnetRange(string $localIP): array {
        $network = long2ip(ip2long($localIP) & ip2long('255.255.255.0'));
        $subnetMask = '255.255.255.0';
        $networkLong = ip2long($network);
        $subnetMaskLong = ip2long($subnetMask);
        $startIP = long2ip($networkLong + 1);
        $endIP = long2ip($networkLong + (~$subnetMaskLong & 0xFFFFFFFF) - 1);
        return [$startIP, $endIP];
    }

    /**
     * Generate the list of hosts within the specified IP range.
     *
     * @param string $startIP
     * @param string $endIP
     * @return array
     */
    public function generateHostsInRange(string $startIP, string $endIP): array {
        $hosts = [];
        $start = ip2long($startIP);
        $end = ip2long($endIP);
        for ($i = $start + 1; $i < $end; $i++) {
            $hosts[] = long2ip($i);
        }
        return $hosts;
    }

    /**
     * Ping the list of hosts and return the results.
     *
     * @return array
     */
    public function pingHosts(): array {
        $results = [];
        $totalHosts = count($this->hosts);
        $progress = 0;

        echo "Scanning hosts: ";

        foreach ($this->hosts as $host) {
            $results[$host] = $this->ping($host) ?: "unreachable";
            $progress++;
            echo ".";
            usleep(50000); // Adjust delay for better visualization
        }

        echo " Done!\n";
        return $results;
    }

    /**
     * Ping the specified host and return the round trip time.
     *
     * @param string $host
     * @param int $timeout
     * @return float|false
     */
    private function ping(string $host, int $timeout = 1) {
        $result = false;
        $socket = socket_create(AF_INET, SOCK_RAW, 1);
        if ($socket === false) {
            return false;
        }
        socket_set_option($socket, SOL_SOCKET, SO_RCVTIMEO, array('sec' => $timeout, 'usec' => 0));
        $connected = @socket_connect($socket, $host, 0);
        if ($connected === false) {
            socket_close($socket);
            return false;
        }
        $package = "\x08\x00\x7d\x4b\x00\x00\x00\x00PingHost";
        $sent = @socket_send($socket, $package, strlen($package), 0);
        if ($sent === false) {
            socket_close($socket);
            return false;
        }
        $ts = microtime(true);
        $response = @socket_read($socket, 255);
        if ($response !== false) {
            $result = microtime(true) - $ts;
        }
        socket_close($socket);
        return $result;
    }
}

$scanner = new NetworkScanner();
$results = $scanner->pingHosts();
print_r($results);