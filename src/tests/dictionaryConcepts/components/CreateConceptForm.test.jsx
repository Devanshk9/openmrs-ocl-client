import React from 'react';
import { shallow } from 'enzyme';
import CreateConceptForm from '../../../components/dictionaryConcepts/components/CreateConceptForm';
import { mockSource } from '../../__mocks__/concepts';

describe('Test suite for CreateConceptForm', () => {
  it('should render CreateConceptForm Component', () => {
    const props = {
      state: {
        id: '1',
      },
      addDescription: jest.fn(),
      handleNewName: jest.fn(),
      path: '',
      toggleUUID: jest.fn(),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      editable: false,
      nameRows: [],
      description: [],
      addAnswer: jest.fn(),
      answer: [],
      disableButton: false,
      match: {
        params: {
          conceptType: '',
          dictionaryName: '',
        },
      },
      concept: '',
      allSources: [mockSource],
    };
    const wrapper = shallow(<CreateConceptForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render form for set concept class', () => {
    const props = {
      state: {
        id: '1',
      },
      concept: 'Set',
      addDescription: jest.fn(),
      handleNewName: jest.fn(),
      path: '',
      toggleUUID: jest.fn(),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      editable: false,
      nameRows: [],
      description: [],
      addAnswer: jest.fn(),
      answer: [],
      disableButton: false,
      allSources: [mockSource],
    };
    const wrapper = shallow(<CreateConceptForm {...props} />);
    expect(wrapper.find('select.set')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render form for symptom-finding concept class', () => {
    const props = {
      state: {
        id: '1',
      },
      concept: 'Symptom-Finding',
      addDescription: jest.fn(),
      handleNewName: jest.fn(),
      path: '',
      toggleUUID: jest.fn(),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      editable: false,
      nameRows: [],
      description: [],
      addAnswer: jest.fn(),
      answer: [],
      disableButton: false,
      allSources: [mockSource],
    };
    const wrapper = shallow(<CreateConceptForm {...props} />);
    expect(wrapper.find('select.symptom-finding')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render form for question concept class', () => {
    const props = {
      state: {
        id: '1',
      },
      concept: 'question',
      addDescription: jest.fn(),
      handleNewName: jest.fn(),
      path: '',
      toggleUUID: jest.fn(),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      editable: false,
      addAnswer: jest.fn(),
      answer: [],
      nameRows: [],
      description: [],
      isEditConcept: true,
      disableButton: false,
      allSources: [mockSource],
    };
    const wrapper = shallow(<CreateConceptForm {...props} />);
    expect(wrapper.find('.form-group.answer')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
