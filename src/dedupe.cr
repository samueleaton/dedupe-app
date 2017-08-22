require "./dedupe/*"
require "raze"

class RequestObject
  JSON.mapping(
    data: Array(String)
  )
end

get "/" do |ctx|
  render "src/views/home.ecr"
end

post "/dedupe" do |ctx|
  content_type = ctx.request.headers["Content-Type"]?
  unless content_type && content_type.starts_with? "application/json"
    ctx.halt_plain "Invalid body type", 400
    next
  end

  raw_body = ctx.request.body

  if raw_body
    begin
      request_obj = RequestObject.from_json(raw_body.gets_to_end)
      arr = request_obj.data
      init_time = Time.now
      deduped_arr = Dedupe.remove_duplicates(arr)
      elapsed_time = Time.now - init_time

      response_obj = {
        "elapsed_milliseconds" => elapsed_time.milliseconds,
        "elapsed_time"         => elapsed_time.to_s,
        "deduped_array"        => deduped_arr,
        "duplicate_count"      => arr.size - deduped_arr.size,
      }

      ctx.halt_json response_obj.to_json
    rescue
      ctx.halt_plain "Invalid json body: must be an array of strings", 400
    end
  else
    ctx.halt_plain "Invalid body", 400
  end
end

Raze.run
