def calculate_distance(coord1, coord2):
    # Placeholder function to calculate distance between two coordinates
    pass

def format_dorm_listing(dorm):
    # Format the dorm listing for display
    return {
        "title": dorm.title,
        "description": dorm.description,
        "price": dorm.price,
        "location": dorm.location,
        "amenities": dorm.amenities,
        "contact": dorm.contact_info,
    }

def validate_coordinates(latitude, longitude):
    # Validate latitude and longitude values
    if not (-90 <= latitude <= 90) or not (-180 <= longitude <= 180):
        raise ValueError("Invalid coordinates")