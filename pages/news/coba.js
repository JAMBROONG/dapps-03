import bodyParser from "body-parser";
import { promisify } from "util";

const getBody = promisify(bodyParser.urlencoded());

export async function getServerSideProps({ req, res }) {
  if (req.method === "POST") {
    await getBody(req, res);
  }

  return {
    props: {
      name: req.body?.name || "smeijer",
      message: req.body ? "received!" : "",
    }
  };
}

export default function IndexPage(props) {
  return (
    <>
      <form method="post">
        <input name="name" defaultValue={props.name} />
        <button type="submit">submit</button>
      </form>
      <p>
        {props.name}
      </p>
    </>
  );
}