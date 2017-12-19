package server.Controllers;
import com.google.gson.Gson;
import server.DBWrapper;
import server.models.Question;
import server.utility.Log;

import java.io.IOException;
import java.util.ArrayList;

public class QuestionController {
    Gson gson;
    DBWrapper db = new DBWrapper ();
    Log log = new Log();


    public QuestionController(){
        this.gson = new Gson();
    }

    /**
     *
     * @param quiz
     * @return q
     *  Metode til at hente alle questions fra db.
     */

    public ArrayList <Question> getQuestions (int quiz) throws IOException, ClassNotFoundException {
        log.writeLog(this.getClass().getName(), this, "We are now getting questions", 2);
        ArrayList<Question> q = db.getQuestions(quiz);
        return q;


    }

    /**
     *
     * @param question
     * @return isCreated
     * Metode til at oprette question
     */

    public Question createQuestion(Question question) throws Exception {

        Question isCreated = db.createQuestion(question);
        return isCreated;
    }
}
