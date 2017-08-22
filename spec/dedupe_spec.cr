require "./spec_helper"
require "secure_random"

describe Dedupe do
  describe "#remove_duplicates" do
    it "should not modify an array if there are no duplicates" do
      a = ["1111", "2222", "3333"]
      Dedupe.remove_duplicates(a).should eq(["1111", "2222", "3333"])
    end

    it "removes duplicate elements" do
      a = ["1111", "2222", "3333", "1111", "1111", "4444", "3333", "5555"]
      Dedupe.remove_duplicates(a).should eq(["1111", "2222", "3333", "4444", "5555"])
    end

    it "removes duplicates from large array in a short amount of time" do
      # arr of 99,000 strings
      strings = [] of String
      (1..99000).each do
        strings << SecureRandom.hex(24)
      end

      # make a copy of first 500 and prepend to array
      strings[0..499].each { |str| strings.unshift str }

      # make a copy of last 500 and append to array
      strings[-500..-1].each { |str| strings << str }

      # there should be 10,000 elements with duplicates
      strings.size.should eq(100000)

      time = Time.now
      deduped_arr = Dedupe.remove_duplicates(strings)
      elapsed_time = Time.now - time

      # deduped array should be same size as original
      deduped_arr.size.should eq(99000)
      (elapsed_time.seconds <= 0).should be_true

      # it should remove duplicates for 100,000 elements in less than 100 milliseconds
      (elapsed_time.milliseconds <= 100).should be_true
    end
  end
end
