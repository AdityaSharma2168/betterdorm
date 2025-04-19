from fastapi import HTTPException
import requests

class MapsService:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://maps.googleapis.com/maps/api"

    def get_geocode(self, address: str):
        url = f"{self.base_url}/geocode/json?address={address}&key={self.api_key}"
        response = requests.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Error fetching geocode data")
        return response.json()

    def get_place_details(self, place_id: str):
        url = f"{self.base_url}/place/details/json?place_id={place_id}&key={self.api_key}"
        response = requests.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Error fetching place details")
        return response.json()