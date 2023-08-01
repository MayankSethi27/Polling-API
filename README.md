# Polling API

This API allows users to create and manage polls. It does not require authentication and is completely open for public use. Users can create questions, add options to questions, and add votes to the options.

## Features

- **Create a question:** Users can create multiple questions for polling.
- **Add options to a question:** For each question, users can add multiple options to choose from.
- **Add a vote to an option of a question:** Users can cast votes for the available options of a question.
- **Delete a question:** (Optional) A question can only be deleted if none of its options has received any votes.
- **Delete an option:** (Optional) An option can only be deleted if it has not received any votes.
- **View a question with its options and all the votes given to it.**

## Required Routes

1. **Create a Question**

   ```
   POST /questions/create
   ```

   Creates a new question for polling. The request should include the question text.

2. **Add Options to a Specific Question**

   ```
   POST /questions/:id/options/create
   ```

   Adds options to a specific question identified by `:id`. The request should include the option text.

3. **Delete a Question**

   ```
   DELETE /questions/:id/delete
   ```

   Deletes a specific question identified by `:id`. (Optional: Only allowed if none of its options have received any votes).

4. **Delete an Option**

   ```
   DELETE /options/:id/delete
   ```

   Deletes a specific option identified by `:id`. (Optional: Only allowed if the option has not received any votes).

5. **Add a Vote to an Option**

   ```
   POST /options/:id/add_vote
   ```

   Increments the vote count for a specific option identified by `:id`.

6. **View a Question and its Options**

   ```
   GET /questions/:id
   ```

   Displays the details of a specific question identified by `:id`, including its options and all the votes given to each option.

