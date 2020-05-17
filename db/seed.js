const {
    client,
    getAllUsers,
    createUser,
    updateUser,
    getAllPosts,
    updatePost,
    createPost,
    getUserById,
    getPostsByUser,
    createTags,
    createPostTag,
    addTagsToPost,
    getPostById,
    getPostsByTagName
  } = require('./index');
  
async function dropTables() {
    try {
        console.log("Starting to drop tables...");

        await client.query(`
        DROP TABLE IF EXISTS post_tags;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
        `);

        

        console.log("Finished dropping tables!");
    } catch (error) {
        console.error("Error dropping tables!");
        throw error;
    }
}
  
async function createTables() {
    try {
        console.log("Starting to build tables...");

        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255),
            active BOOLEAN DEFAULT true
        );
        `);

        await client.query(`
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY,
            "authorId" INTEGER REFERENCES users(id) NOT NULL,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            active BOOLEAN DEFAULT true
        );
        `);

        await client.query(`
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );
        `);

        await client.query(`
        CREATE TABLE post_tags (
            "postId" INTEGER REFERENCES posts(id),
            "tagId" INTEGER REFERENCES tags(id),
            UNIQUE ("postId", "tagId")
        );
        `);

        console.log("Finished building tables!");
    } catch (error) {
        console.error("Error building tables!");
        throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialPosts()
    } catch (error) {
        console.log("Error during rebuildDB")
        throw error;
    }
}

async function testDB() {
    try {
      console.log("Starting to test database...");
  
      console.log("Calling getAllUsers");
      const users = await getAllUsers();
      console.log("Result:", users);
  
      console.log("Calling updateUser on users[0]");
      const updateUserResult = await updateUser(users[0].id, {
        name: "GinnyW",
        location: "Quidditch Pitch"
      });
      console.log("Result:", updateUserResult);
  
      console.log("Calling getAllPosts");
      const posts = await getAllPosts();
      console.log("Result:", posts);
  
      console.log("Calling updatePost on posts[0]");
      const updatePostResult = await updatePost(posts[0].id, {
        title: "Quidditch Practice",
        content: "Wednesday, 5:00 p.m."
      });
      console.log("Result:", updatePostResult);
  
      console.log("Calling getUserById with 1");
      const harry = await getUserById(1);
      console.log("Result:", harry);

      console.log("Calling getPostsByUser with 1");
      const harryP = await getPostsByUser(1);
      console.log("Result:", harryP);

    console.log("Calling updatePost on posts[1], only updating tags");
    const updatePostTagsResult = await updatePost(posts[1].id, {
      tags: ["#youcandoanything", "#redfish", "#bluefish"]
    });
    console.log("Result:", updatePostTagsResult);

    console.log("Calling getPostsByTagName with #happy");
    const postsWithHappy = await getPostsByTagName("#happy");
    console.log("Result:", postsWithHappy);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.log("Error during testDB");
      throw error;
    }
  }

async function createInitialUsers() {
    try {
        console.log("Starting to create users...");

        const harry = await createUser({ username: 'harry', password: 'potter1', name: 'HarryP' });
        const ron = await createUser({ username: 'ron', password: 'weasley7', name: 'RonW' });
        const hermione = await createUser({ username: 'hermione', password: 'granger1', name: 'HermioneG' });

        // console.log(harry);

        console.log("Finished creating users!");
    } catch(error) {
        console.error("Error creating users!");
        throw error;
    }
}

async function createInitialPosts() {
    try {
      const [harry, ron, hermione] = await getAllUsers();
  
      await createPost({
        authorId: harry.id,
        title: "First Post",
        content: "Down with Voldemort!",
        tags: ["#happy", "#youcandoanything"]
      });

      await createPost({
        authorId: hermione.id,
        title: "Tutor Needed",
        content: "Interested in learning Patronus spell; will pay galleons.",
        tags: ["#happy", "#worst-day-ever"]
      });

      await createPost({
        authorId: ron.id,
        title: "Quidditch",
        content: "Go Gryffindor!",
        tags: ["#happy", "#youcandoanything", "#canmandoeverything"]
      });

      await createPost({
        authorId: harry.id,
        title: "Missed Charms",
        content: "Need notes from last Tuesday. Please help.",
        tags: ["#worst-day-ever"]
      });
  
      // a couple more
    } catch (error) {
      throw error;
    }
}

async function createInitialTags() {
    try {
      console.log("Starting to create tags...");
  
      const [happy, sad, inspo, catman] = await createTags([
        '#happy', 
        '#worst-day-ever', 
        '#youcandoanything',
        '#catmandoeverything'
      ]);
  
      const [postOne, postTwo, postThree] = await getAllPosts();
  
      await addTagsToPost(postOne.id, [happy, inspo]);
      await addTagsToPost(postTwo.id, [sad, inspo]);
      await addTagsToPost(postThree.id, [happy, catman, inspo]);
  
      console.log("Finished creating tags!");
    } catch (error) {
      console.log("Error creating tags!");
      throw error;
    }
}
  
rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());