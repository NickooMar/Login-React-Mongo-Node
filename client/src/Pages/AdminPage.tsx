import Axios, { AxiosResponse } from 'axios'
import React, {useEffect, useState, useContext} from 'react'
import { UserInterface } from '../Interfaces/Interfaces';
import { myContext } from "./Context";
import { Button } from "@material-ui/core";
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { toast } from "react-toastify";

function AdminPage() {
    const ctx = useContext(myContext);
    console.log(ctx)

    const [data, setData] = useState<UserInterface[]>();

    const [selectedUser, setSelectedUser] = useState<string>()

    useEffect(() => {
        Axios.get('http://localhost:4000/getallusers', {
            withCredentials: true //Para ver si es admin o no
        }).then((res : AxiosResponse) => {

            setData(res.data.filter((item: UserInterface)=> {//El uso de interfaces permite el autocompletado.
                return item.username !== ctx.username
            })) //Para evitar que nos permita eliminar nuestro propio usuario usamos el filter method
        });
        
    }, [ctx]); //useEffect depende de ctx, cada vez que cambia ctx ejecutamos el useEffect.

    if(!data){
        return null;
    }

    const deleteUser = () => {
        let userid: string;

        data.forEach((item: UserInterface) => {
            if(item.username === selectedUser) {
                userid = item.id
            }
        });

        Axios.post('http://localhost:4000/deleteuser', {
            id: userid! 
        }, {
            withCredentials: true
        })
    };


    const setAdminUser = () => {
        let userId: string;

        data.forEach((item: UserInterface) => {
            if(item.username === selectedUser){
                userId = item.id;
            }
        });

        Axios.post('http://localhost:4000/setAdminUser', {
            id: userId!
        }, {
            withCredentials:true
        }).then((res: AxiosResponse) => {
            if(res.data === 'success'){
                toast.success('Successfully changed')
            } else {
                toast.error("Couldn't set to Admin the user")
            }
        });
    };

    return (
        <div className="text-center" style={{marginTop: "200px"}}>
            <select onChange={e => setSelectedUser(e.target.value)} name="deleteUser" style={optionStyles} id="deleteUser">
            <option id='Select a user'>Select a User</option>
                {
                    data.map((item: UserInterface) => {
                        return (
                            <option id={item.username} key={item.username} >{item.username}</option>
                        )
                    })
                }
            </select>
            <Button onClick={deleteUser} style={optionStyles} className="mb-1 ml-3" variant="contained" color="secondary">Delete User</Button>
            <Button onClick={setAdminUser} style={optionStyles} className="mb-1 ml-3" variant="contained" color="primary">Set Admin</Button>
        </div>
    )
}

const optionStyles:CSSProperties = {
    "width": "150px",
    "height": "33px"
}

export default AdminPage
