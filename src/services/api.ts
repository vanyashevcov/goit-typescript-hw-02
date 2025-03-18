import axios, { AxiosResponse } from "axios";

// Створення типу для фотографії
interface Image {
  id: string;
  alt_description: string;
  urls: {
    regular: string;
  };
  description: string;
  // Додайте інші властивості, якщо потрібно
}

// Оголошення типу для відповіді API
interface ApiResponse {
  results: Image[]; // Тепер це масив об'єктів типу Image
  total_pages: number;
}

const API_KEY = "CI08OXJ2WfC7ba8BY7S7g_CUb2qEfKWdpoZ7oQb5RKs";

export const fetchImages = async (
  query: string,
  page: number,
  perPage: number = 16
): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await axios.get(
    "https://api.unsplash.com/search/photos?",
    {
      params: {
        client_id: API_KEY,
        query: query,
        page: page,
        per_page: perPage,
        order_by: "views",
        orientation: "landscape",
      },
    }
  );

  return response.data; // Тепер можна точно працювати з даними
};
