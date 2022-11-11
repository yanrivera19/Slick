json.extract! message,
    :id, :content, :author_id, :author_name, :created_at, :updated_at, :messageable_id, :messageable_type

# json.channel_messages channel_messages.each do |channel_message|
# 	json.extract! channel_message, :id
# end