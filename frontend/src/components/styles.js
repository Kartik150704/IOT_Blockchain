// styles.js

import styled from 'styled-components';

export const FormContainer = styled.form`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const FormButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const PolicyContainer = styled.div`
  margin-top: 15px;
  border: 3px solid #ddd;
  border-radius: 8px;
  padding: 15px;
`;

export const AddPolicyPointButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  height: 40px;

  &:hover {
    background-color: #45a049;
  }
`;

export const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
  margin-left: 15px;

  &:hover {
    background-color: #45a049;
  }
`;

export const PolicyPointContainer = styled.div`
  margin-top: 10px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

export const PolicyPointLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const PolicyPointInput = styled.input`
  width: calc(50% - 5px);
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
`;

export const OuterPolicyPointButton = styled.div`
  margin-left : 80px;
`;
export const PolicyPointButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const PolicyNumber = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export const OuterPolicyContent = styled.div`
  display: flex;
  justfiy-content: center;
  align-items: center;
`;

export const PolicyContent = styled.div`
  display: inline-block;
  width: calc(50% - 5px);
  vertical-align: top;
  margin-bottom: 10px;
`;

export const PolicyHeader = styled.h3`
  margin-top: 0;
`;

export const PolicyDescription = styled.p`
  margin-bottom: 0;
  color: #555;
`;


export const CustomModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export const ModalButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

