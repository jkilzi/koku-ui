import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

import CardSelect from './cardSelect';
import PlainText from './plainText';
import Select from './select';
import SubForm from './subForm';
import TextArea from './textArea';
import TextField from './textField';
import Wizard from './wizard';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA]: TextArea,
  [componentTypes.SELECT]: Select,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.PLAIN_TEXT]: PlainText,
  [componentTypes.WIZARD]: Wizard,
  'card-select': CardSelect,
};

export default componentMapper;
