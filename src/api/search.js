export const search = async (term) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&limit=5`
      );
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        return data.features.map(feature => ({
          name: feature.properties.display_name,
          coordinates: [
            feature.geometry.coordinates[1], // Latitude
            feature.geometry.coordinates[0]  // Longitude
          ]
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching data from Nominatim:', error);
      return [];
    }
  };
  