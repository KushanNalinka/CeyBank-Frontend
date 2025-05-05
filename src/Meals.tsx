import axios from 'axios';

const fetchFoods = async () => {
    try {
        // Fetch food data
        const response = await axios.get("http://localhost:8080/api/foods");
        const data = response.data;

        // Map the API data to the desired structure
        return data.map(item => ({
            id: item.foodId,
            code: item.code,
            name: item.name,
            image: item.image,
            description: item.description,
            slug: item.slug,
            price: item.price,
            portionType: item.portionType,
            itemCategory: item.itemCategory,
            availableForMeals: item.availableForMeals
        }));
    } catch (error) {
        console.error('Error fetching foods:', error);
        return []; // Return an empty array in case of error
    }
};

export const products = await fetchFoods();
