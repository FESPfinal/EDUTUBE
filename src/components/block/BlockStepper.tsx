'use client';
import Stepper from '../atom/Stepper';

interface ErrorType {
  name: string;
  content: string;
  intro: string;
}

interface type {
  nameValue: string;
  contentValue: string;
  introValue: string;
  errors: ErrorType;
}

const BlockStepper = ({ nameValue, contentValue, introValue, errors }: type) => {
  return (
    <div>
    <ul>
      <li>
        <Stepper title='전체 제목 설정' state={!nameValue ? 'default' : (errors.name ? 'error' : 'active')} />
      </li>
      <li>
        <Stepper title='content' state={!contentValue ? 'default' : (errors.content ? 'error' : 'active')}/>
      </li>
      <li>
        <Stepper title='intro' state={!introValue ? 'default' : (errors.intro ? 'error' : 'active')}/>
      </li>
    </ul>
  </div>
  )
}

export default BlockStepper;