import React, { useState } from 'react'
import Modal from 'react-modal';
import { axiosInstance } from '../../utils/axiosInstance';
import Form from '../Form/Form';

function InvitationModal({open, setOpen}) {

    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState(null);

    const closeModal = () => {
        setOpen(false)
    }

    const searchUser = async (data) => {
        try {
            const response = await axiosInstance.get('/user/' + data.email);
            setResult(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    

  return (
    <>
    <Modal isOpen={open}>
        <div className='relative'>
            <button onClick={closeModal} className='absolute right-2 top-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <div className='pt-8'>
                <Form onSubmit={searchUser} submitText={"Rechercher"}>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='font-semibold'>Entrer l'email exact de l'utilisateur</label>
                        <input type="text" name="email" id="email" placeholder='johndoe@exemple.com' className='px-4 py-2 border rounded-lg' autoComplete='off'/>
                    </div>  
                </Form>
                {result && (<div className='mt-4'>
                        <div className='flex flex-row items-center gap-4'>
                            <div className="h-12 w-12 overflow-hidden">
                            <img className="object-cover w-full h-full rounded-full" src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            </div>
                            <div>
                                <p className='font-lg font-semibold'>{result.name}</p>
                            </div>
                            <div>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-full">Inviter</button>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
        
    </Modal>
    </>
  )
}

export default InvitationModal