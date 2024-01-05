# trial-engineering

## Technical architecture

This project uses Node.js as the backend language, Express as the web framework, and SQLite3 as the database.

<hr>

## Project address

Access address: http://localhost:3100/

<hr>

## Initialize installation dependencies

Execute the following command in the project root directory to install dependencies:

```Bash
npm --verbose --register https://registry.npm.taobao.org install
```

<hr>

## Start Run

Execute the following command in the project root directory to start the project:

```Bash
npm start
```

<hr>

## Implement functions

1. User registration: Users can click the "Registration" button on the homepage to register, fill in information such as username and password, and submit. The backend will store user information in the SQLite3 database.
2. User login: Users can click the "login" button on the homepage to log in, enter their username and password, and submit. The backend will verify whether the username and password are correct, and if they are correct, return a login success message.
3. User profile modification: Logged in users can click the "Modify Profile" button on the personal center page to modify their profile. Users can modify their username, profile picture, and other information. The backend will update the modified user information to the SQLite3 database.
4. User password modification: Logged in users can click the "Change Password" button on the personal center page to modify their password. Users can enter both old and new passwords for modification. The backend will verify whether the old password is correct, and if it is correct, update the user's password and return a successful modification message.
5. Equipped with user article management function.

<hr>

## Docker correlation

### Add the current user to the Docker group

```
sudo usermod - aG docker $USER
```

### Get information about the Docker group, including group name, group ID, and group members

```
getent group docker
```

### Switch current user to Docker group

```
newgrp docker
```

### Build a Docker image

```
docker build - t webapp1 .
```

### Run webapp1 image in the background on the specified port

```
docker run -t -i -d -p 3100:3100 webapp1
```

### Start an interactive shell in the specified container and log in to the container.

```
docker exec -it <container_ Id> /bin/bash
```

**The Docker image built is 1.2GB in size, so it is not recommended to build it**

<hr>

## Identify

bodhi6-1-sknd-mini-dll

<hr>
