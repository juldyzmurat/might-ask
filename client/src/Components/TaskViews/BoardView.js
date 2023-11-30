import { Admin, Resource, EditGuesser, ShowGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import { TaskList } from ".";

const dataProvider = simpleRestProvider("http://localhost:5200/");

const BoardView = ({ tasks }) => {
  return (
    <Admin basename="/task-views/kanban/" dataProvider={dataProvider}>
      <Resource name="tasks" list={TaskList} edit={EditGuesser} show={ShowGuesser} />
    </Admin>
  );
};

export default BoardView;
