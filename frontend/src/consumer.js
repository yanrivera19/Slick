import { createConsumer } from "@rails/actioncable";

let wsUrl;
if (process.env.NODE_ENV !== "production") {
  wsUrl = "ws://localhost:5000/cable";
} else {
  wsUrl = "wss://slick-ngn1.onrender.com/cable";
}

export default createConsumer(wsUrl);
