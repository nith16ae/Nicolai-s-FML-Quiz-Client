package server.endpoints;

import com.google.gson.Gson;
import server.utility.Log;
import server.Controllers.UserController;
import server.models.User;
import server.security.XORController;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.ArrayList;


@Path("/user")
public class UserEndpoint {

    Log log = new Log();
    UserController controller = new UserController();

    /**
     * Metode der bruges til at hente alle users
     * @return Alle users
     */

    @Path("/getAll")
    @GET
    public Response getUsers() {

        log.writeLog(this.getClass().getName(), this, "We are now getting users", 2);
        ArrayList<User> users = controller.getUsers();
        String output = new Gson().toJson(users);
        output = XORController.encryptDecryptXOR(output);

        return Response.status(200)
                .type("plain/text")
                .entity(output)
                .build();

    }


    /**
     * Laver en ny User i databasen
     * @param user
     * @return True or False
     * @throws Exception
     */

    @POST
    public Response createUser(String user) throws Exception {

        log.writeLog(this.getClass().getName(), this, "We are now creating user", 2);
        user = XORController.encryptDecryptXOR(user);

        User createUser = controller.createUser(user);
        String output = new Gson().toJson(createUser);
        String encryptedOutput = XORController.encryptDecryptXOR(output);

        if(createUser != null) {
            return Response
                    .status(200)
                    .type("plain/text")
                    .entity(encryptedOutput)
                    .build();
        } else {
            return Response.status(400).entity("Error").build();
        }

    }

    /**
     * Tjekker om useren findes i systemet
     * @param data
     * @return True  or False
     * @throws Exception
     */

    @Path("/login")
    @POST
    public Response authorizeUser(String data) throws Exception {

        log.writeLog(this.getClass().getName(), this, "We are now authorizing user for login", 2);
        data = XORController.encryptDecryptXOR(data);
        User u = controller.login(data);
        String output = new Gson().toJson(u);

        output = XORController.encryptDecryptXOR(output);

        if (u != null) {
            log.writeLog(this.getClass().getName(), this, "User logged in", 2);

            return Response.status(200).type("plain/text").entity(output).build();
        } else {
            log.writeLog(this.getClass().getName(), this, "User not logged in because of failure", 1);
            return Response.status(400).type("plain/text").entity("failure!").build();
        }

    }

    @DELETE
    @Path("/{id}")
    public Response deleteUser (@PathParam("id") int userID) throws Exception {

        log.writeLog(this.getClass().getName(), this, "We are now in process of deleting a user", 2);
        Boolean deleteUser = controller.deleteUser(userID);

        if (deleteUser == true) {
            log.writeLog(this.getClass().getName(), this, "User bliver slettet", 2);
            return Response
                    .status(200)
                    .type("application/json")
                    .entity(XORController.encryptDecryptXOR("\"User has been deleted.\""))
                    .build();
        } else {
            log.writeLog(this.getClass().getName(), this, "User er ikke slettet korrekt", 2);
            return Response
                    .status(200)
                    .type("application/json")
                    .entity(XORController.encryptDecryptXOR("\"User has not been deleted.\""))
                    .build();
        }
    }
}