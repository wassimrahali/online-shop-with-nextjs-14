
export const syncUserWithStrapi = async (clerkUser: any) => {
    const userData = {
      username: clerkUser.username || clerkUser.fullName || "defaultUsername",
      email: clerkUser.primaryEmailAddress?.emailAddress || "default@example.com",
      password: clerkUser.password,
    };
  
    console.log("User data being sent to Strapi:", userData);
  
    try {
      const existingUserResponse = await fetch(
        `http://localhost:1337/api/users?email=${userData.email}`
      );
      const existingUser = await existingUserResponse.json();
  
      if (existingUser.length > 0) {
        console.log("User already exists in Strapi:", existingUser[0]);
        return existingUser[0];
      }
  
      const res = await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!res.ok) {
        console.error(
          "Failed to sync user with Strapi:",
          res.status,
          res.statusText
        );
        throw new Error("Failed to sync user with Strapi");
      }
  
      const data = await res.json();
      console.log("Strapi response data:", data); 
      return data;
    } catch (error) {
      console.error("Error syncing user with Strapi:", error);
    }
  };
  