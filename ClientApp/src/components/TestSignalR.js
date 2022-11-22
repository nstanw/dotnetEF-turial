import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";

export default function TestSignalR() {
    const [connection, setConnection] = useState(null);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        var connection = new HubConnectionBuilder().withUrl("/note-hub").build();


        connection.on("ReceiveMessage", function (user, message) {
            console.log( `${user} says ${message}`);
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

        // document.getElementById("sendButton").addEventListener("click", function (event) {
        //     var user = document.getElementById("userInput").value;
        //     var message = document.getElementById("messageInput").value;
        //     connection.invoke("SendMessage", user, message).catch(function (err) {
        //         return console.error(err.toString());
        //     });
        //     event.preventDefault();
        // });
        setConnection(connection);

    }, []);


    const sendMessage = async () => {
        try {
            var user = document.getElementById("userInput").value;
            var message = document.getElementById("messageInput").value;
            await connection.invoke("SendMessage", user, message).catch(function (err) {
                return console.error(err.toString());
            });
        } catch (err) {
            console.error(err);
        }
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
                    <div class="col-6"

                    >
                        <input
                            onClick={sendMessage}
                            type="button" id="sendButton" value="Send Message" />
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