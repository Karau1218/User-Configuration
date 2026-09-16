user_settings = {
    'theme': 'dark',
    'language': 'english',
    'notifications': 'enabled'
}

def add_setting(settings, item):
    key, value = item
    key = str(key).lower()
    value = str(value).lower()
    if key in settings:
        return f"Setting '{key}' already exists! Cannot add a new setting with this name."
    settings[key] = value
    return f"Setting '{key}' added with value '{value}' successfully!"

def update_setting(settings, item):
    key, value = item
    key = str(key).lower()
    value = str(value).lower()
    if key in settings:
        settings[key] = value
        return f"Setting '{key}' updated to '{value}' successfully!"
    return f"Setting '{key}' does not exist! Cannot update a non-existing setting."

def delete_setting(settings, key):
    key = str(key).lower()
    if key in settings:
        del settings[key]
        return f"Setting '{key}' deleted successfully!"
    return "Setting not found!"

def view_settings(settings):
    if not settings:
        return "No settings available."
    lines = ["Current User Settings:"]
    for k, v in settings.items():
        lines.append(f"{k.capitalize()}: {v}")
    return "\n".join(lines) + "\n"

test_settings = {
    "theme": "dark",
    "language": "english",
    "notifications": "enabled"
}