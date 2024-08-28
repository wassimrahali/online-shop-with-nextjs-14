import axios from 'axios';

export const syncUserWithStrapi = async (clerkUser: any) => {
  const userData = {
    username: clerkUser.username || clerkUser.fullName || "defaultUsername",
    email: clerkUser.primaryEmailAddress?.emailAddress || "default@example.com",
    password: clerkUser.password || "defaultPassword", // Add a fallback for password if needed
  };

  console.log("User data being sent to Strapi:", userData);

  try {
    // Check if the user already exists in Strapi by email
    const existingUserResponse = await axios.get(
      `http://localhost:1337/api/users?filters[email][$eq]=${userData.email}`
    );

    const existingUser = existingUserResponse.data;

    if (existingUser.length > 0) {
      console.log("User already exists in Strapi:", existingUser[0]);
      console.log("Authenticated User:", existingUser[0].username);
      return existingUser[0];
    }

    // Register the new user in Strapi
    const res = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = res.data;
    console.log("Strapi response data:", data);
    console.log("JWT Token:", data.jwt);

    if (data.jwt) {
      console.log("User successfully authenticated with Strapi.");
    } else {
      console.log("User registration was successful, but no JWT token received.");
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to sync user with Strapi:", error.response?.status, error.response?.statusText);
    } else {
      console.error("Error syncing user with Strapi:", error);
    }
  }
};
