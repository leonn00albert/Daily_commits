<?php
/**
 * Exercise: Implement Simple File-Based Caching in PHP
 *
 * Description:
 * Create a PHP script that implements a basic file-based caching mechanism to store and retrieve data from an external source.
 * This exercise will help you understand how caching works and how it can improve the performance of web applications by reducing the load on external resources.
 *
 * Instructions:
 * 1. Create a PHP function named `getDataFromSource($key)` that simulates fetching data from an external source. You can simply return a string with the key appended to it for demonstration purposes.
 * 2. Implement a caching function named `getData($key, $cacheTime)` that retrieves data either from the cache file if it exists and is fresh (not expired), or from the source otherwise. The function should take two parameters: the cache key and the cache time in seconds (optional, defaults to 3600 seconds or 1 hour).
 * 3. The cache should be stored in files. Use the cache key to generate a unique filename, and store the data in that file.
 * 4. Ensure that the cache file is stored in a directory named `cache` within the same directory as your PHP script. Handle cases where the `cache` directory doesn't exist or the web server doesn't have write permissions to it.
 * 5. Test your caching mechanism by calling the `getData` function with different keys and cache times. Verify that the data is retrieved from the cache when it's fresh and fetched from the source otherwise.
 */

class fileCache
{
    /**
     * The directory where cache files are stored.
     *
     * @var string
     */
    private $cacheDir = 'cache/';

    /**
     * The default cache time in seconds.
     *
     * @var int
     */
    private $cacheTime = 3600;

    /**
     * Constructs a new fileCache instance.
     *
     * @param string|null $cacheDir The directory where cache files are stored. Defaults to 'cache/'.
     * @param int $cacheTime The default cache time in seconds. Defaults to 3600 seconds.
     */
    public function __construct(string $cacheDir = null, int $cacheTime = 3600)
    {
        if ($cacheDir) {
            $this->cacheDir = $cacheDir;
        }
        $this->cacheTime = $cacheTime;
    }

    /**
     * Stores data in the cache.
     *
     * @param string $key The cache key.
     * @param mixed $data The data to be stored in the cache.
     * @return void
     */
    public function setData(string $key, string|object|array $data): void
    {
        if (!is_dir($this->cacheDir)) {
            mkdir($this->cacheDir, 0777, true);
        }
        if (is_object($data) || is_array($data)) {
            $data = json_encode($data);
        }
        $key = md5($key);
        $cacheFile = $this->cacheDir . $key . '.cache';
        file_put_contents($cacheFile, $data);
    }

    /**
     * Retrieves data from the cache.
     *
     * @param string $key The cache key.
     * @param int|null $cacheTime The cache time in seconds. Defaults to the value set in the constructor.
     * @return mixed|null The cached data, or null if the cache is expired or doesn't exist.
     */
    public function getData(string $key, ?int $cacheTime = null): mixed
    {
        $key = md5($key);
        if ($cacheTime) {
            $this->cacheTime = $cacheTime;
        }
        $cacheFile = $this->cacheDir . $key . '.cache';
        if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $this->cacheTime)) {
            return file_get_contents($cacheFile);
        }
        return null;
    }

    /**
     * Deletes data from the cache.
     *
     * @param string $key The cache key.
     * @return void
     */
    public function deleteData(string $key):void
    {
        $key = md5($key);
        $cacheFile = $this->cacheDir . $key . '.cache';
        if (file_exists($cacheFile)) {
            unlink($cacheFile);
        }
    }

    /**
     * Clears the entire cache.
     *
     * @return void
     */
    public function clearCache():void
    {
        $files = glob($this->cacheDir . '*.cache');
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
    }
}

$cache = new fileCache();
