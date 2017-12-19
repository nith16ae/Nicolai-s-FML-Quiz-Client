package server.Controllers;

import com.google.gson.Gson;
import server.DBWrapper;
import server.models.Login;
import server.models.User;
import server.utility.Log;

import java.util.ArrayList;


/**
 * @author QuizFML
 * Klassen der håndtere alt logik, der vedrører user
 */
public class UserController {

    Log log = new Log();
    ArrayList<User> users;
    Gson gson;
    DBWrapper db = new DBWrapper();

    /**
     * Konstruktør til user controller
     */
    public UserController() {
        this.gson = gson;
    }

    /**
     * Metode til at hente alle users
     * @return users
     */
    public ArrayList<User> getUsers() {
        log.writeLog(this.getClass().getName(), this, "We are now getting users", 0);
        ArrayList<User> users = db.getUsers();
        return users;
    }

    /**
     * Metode der bruges til at verificere users når de logger ind
     * @param data
     * @return User found
     * @throws Exception
     */
    public User login(String data) throws Exception {
        log.writeLog(this.getClass().getName(), this, "User trying to log in", 2);

        Login login = null;
        try {
            login = new Gson().fromJson(data, Login.class);
            User userFound = DBWrapper.authorizeUser(login.getUsername(), login.getPassword());
        return userFound;
        } catch (Exception e) {
            log.writeLog(this.getClass().getName(), this, "Catching an exception", 1);
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Metode der bruges til at oprette en ny bruger i systemet
     * @param user
     * @return Den oprettede user
     * @throws Exception
     */
    public User createUser(String user) throws Exception {

        log.writeLog(this.getClass().getName(), this, "Soo-to-be user passing through Controller", 0);
        User newUser = new Gson().fromJson(user, User.class);
        newUser.setCreatedTime();

        return db.createUser(newUser);

    }

    public Boolean deleteUser (int userId) throws Exception {
        log.writeLog(this.getClass().getName(), this, "We are deleting a user", 0);
        return db.deleteUser(userId);
    }



}

















