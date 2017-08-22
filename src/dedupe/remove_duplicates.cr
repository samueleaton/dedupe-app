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
