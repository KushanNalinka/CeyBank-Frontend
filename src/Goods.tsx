import axios from 'axios';


const fetchFoods = async () => {
    try {
        // Fetch food data
        const response = await axios.get("http://localhost:8080/api/v1/InventoryItem/all");
        const data = response.data;

        

        // Map the API data to the desired structure
        return data.map(item => ({
          id: item.itemId,
          itemCode: item.itemCode,
          name: item.itemName,
          status: item.status,
          unit: item.unit,
          category: item.category,
          quantity: item.quantity,
          reOrderLevel: item.reOrderLevel,
          maximumReorderLevel: item.maximumReorderLevel,
          image: item.image,
          description: item.description,
          slug: item.slug
        }));
    } catch (error) {
        console.error('Error fetching foods:', error);
        return []; // Return an empty array in case of error
    }
};


export const products = await fetchFoods();



