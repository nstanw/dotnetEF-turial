import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";

export default function CloneTest() {
    const [connection, setConnection] = useState(null);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        var connection = new HubConnectionBuilder().withUrl("/note-hub").build();

        //Disable send button until connection is established
        document.getElementById("sendButton").disabled = true;

        connection.on("ReceiveMessage", function (user, message) {
 
            var li = document.createElement("li");
            document.getElementById("messagesList").appendChild(li);
            // We can assign user-supplied strings to an element's textContent because it
            // is not interpreted as markup. If you're assigning in any other way, you 
            // should be aware of possible script injection concerns.
            li.textContent = `${user} says ${message}`;
        });

        connection.start().then(function () {
            document.getElementById("sendButton").disabled = false;
        }).catch(function (err) {
            return console.error(err.toString());
        });

        document.getElementById("sendButton").addEventListener("click", function (event) {
            var user = document.getElementById("userInput").value;
            var message = document.getElementById("messageInput").value;
            connection.invoke("SendMessage", user, message).catch(function (err) {
                return console.error(err.toString());
            });
            event.preventDefault();
        });
        setConnection(connection);

    }, []);


    const sendMessage = async () => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (err) {
            console.error(err);
        }
        try {
            connection.send("SendMessage", message)
                .then(res => console.log(res));
        } catch (err) {
            console.error(err);
        }
        setInputText("");
    };

    return (
        <div>
            <div class="container">
                <div class="row">&nbsp;</div>
                <div class="row">
                    <div class="col-2">User</div>
                    <div class="col-4"><input type="text" id="userInput" /></div>
                </div>
                <div class="row">
                    <div class="col-2">Message</div>
                    <div class="col-4"><input type="text" id="messageInput" /></div>
                </div>
                <div class="row">&nbsp;</div>
                <div class="row">
                    <div class="col-6">
                        <input type="button" id="sendButton" value="Send Message" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <hr />
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <ul id="messagesList"></ul>
                </div>
            </div>
        </div >
    )
};