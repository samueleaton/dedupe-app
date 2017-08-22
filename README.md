# dedupe

Removes Duplicates from Array of Strings

## Usage

### Building the Docker Image

```
docker build -f Dockerfile -t dedupe .
```

### Running the Docker Container

```
docker run --name dedupe -p 7777:7777 -d dedupe
```

## Dedupe Core Algorithm

```ruby
module Dedupe
  def self.remove_duplicates(list : Array(String))
    temp_hash = {} of String => Int32
    result = [] of String

    list.each do |str|
      unless temp_hash[str]?
        temp_hash[str] = 1
      end
    end

    temp_hash.each do |k, v|
      result << k
    end

    result
  end
end

Dedupe.remove_duplicates(["sameaton11@gmail.com", "sameaton11@gmail.com"])
```

## Contributors

- [Sam Eaton](https://github.com/samueleaton) - creator, maintainer
