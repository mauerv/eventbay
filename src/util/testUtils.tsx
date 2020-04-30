import { ShallowWrapper, ReactWrapper } from 'enzyme';

export const findByTestAttr = (wrapper: ShallowWrapper | ReactWrapper, val: string) => {
  return wrapper.find(`[data-test="${val}"]`);
};
