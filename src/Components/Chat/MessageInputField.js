import React, { useState ,memo} from "react";
import { Form, Segment } from "semantic-ui-react";

function MessageInputField({ sendmsg }) {
  const [text, setText] = useState("");


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
              disabled: text === ""
            }}
          />
        </Form>
      </Segment>
    </div>
  );
}

export default memo(MessageInputField);
