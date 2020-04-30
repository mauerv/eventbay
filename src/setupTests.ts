import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import dotenv from 'dotenv';

dotenv.config();

configure({ adapter: new Adapter() });
