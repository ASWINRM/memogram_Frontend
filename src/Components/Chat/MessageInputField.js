import React, { useState } from "react";
import { Form, Segment } from "semantic-ui-react";

function MessageInputField({ sendmsg }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div style={{  bottom: "0" }}>
      <Segment secondary color="teal" attached="bottom">
        <Form
          reply
          onSubmit={e => {
            e.preventDefault();
            sendmsg(text);
            setText("");
          }}
        >
          <Form.Input
            size="tiny"
            placeholder="Send New Message"
            value={text}
            onChange={e => setText(e.target.value)}
            action={{
              color: "blue",
              icon: "telegram plane",
              disabled: text === "",
              loading: loading
            }}
          />
        </Form>
      </Segment>
    </div>
  );
}

export default MessageInputField;
