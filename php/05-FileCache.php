<?php
/*
Exercise: Implement Simple File-Based Caching in PHP

Description:
Create a PHP script that implements a basic file-based caching mechanism to store and retrieve data from an external source.
This exercise will help you understand how caching works and how it can improve the performance of web applications by reducing the load on external resources.

Instructions:
1. Create a PHP function named `getDataFromSource($key)` that simulates fetching data from an external source. You can simply return a string with the key appended to it for demonstration purposes.
2. Implement a caching function named `getData($key, $cacheTime)` that retrieves data either from the cache file if it exists and is fresh (not expired), or from the source otherwise. The function should take two parameters: the cache key and the cache time in seconds (optional, defaults to 3600 seconds or 1 hour).
3. The cache should be stored in files. Use the cache key to generate a unique filename, and store the data in that file.
4. Ensure that the cache file is stored in a directory named `cache` within the same directory as your PHP script. Handle cases where the `cache` directory doesn't exist or the web server doesn't have write permissions to it.
5. Test your caching mechanism by calling the `getData` function with different keys and cache times. Verify that the data is retrieved from the cache when it's fresh and fetched from the source otherwise.
*/