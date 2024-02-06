import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CarResponse } from "../types";
import { DataGrid, GridCellParams, GridColDef, GridEditCellValueParams} from "@mui/x-data-grid";
import { Button, Snackbar } from "@mui/material";
import { deleteCar } from "../carApi";
import { useState } from "react";
import Confirmation from "./Confirmation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCar from "./AddCar";
import EditCar from "./EditCar";



const CarList = () => {

    const queryClient = useQueryClient();
    const[open, setOpen] = useState(false);
    const[openConfirmation, setOpenConfirmation] = useState(null);
    const[showSnackBar, setSnackBar] = useState(false);


    const getCars = async(): Promise<CarResponse[]> => {         // returns array of carResponse
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars`)
    return response.data;
    }

    const {data,error,isSuccess} = useQuery({
        queryKey: ["cars"],
        queryFn: getCars                     //fn is function
    })


const columns : GridColDef[] = [
{field:'make',headerName :'Make',width: 200},
{field: 'model', headerName: 'Model', width: 200},
{field: 'color', headerName: 'Color', width: 200},
{field: 'registerNumber', headerName: 'Reg #', width: 150},
{field: 'year', headerName: 'Year', width: 150},
{field: 'price', headerName: 'Price', width: 150},

{field: 'edit',
headerName:'',
sortable: false,
filterable: false,
renderCell: (params: GridCellParams) => 
    <EditCar Cardata={params.row} />
},



{field: 'delete', headerName: '', sortable:false, filterable:false,
    renderCell: (params: GridCellParams)    => ( 
        <>
<Button 
onClick={ () => setOpenConfirmation({
    id:params.row.id,
    make: params.row.make,
    model: params.row.model})}
color="error"> <DeleteForeverIcon/>             
</Button> 


<Confirmation
 open={openConfirmation?.id===params.row.id} 
make = {openConfirmation?.make}
model = {openConfirmation?.model}

onClose={() => setOpenConfirmation(false)}
onConfirm ={() => {mutate(params.row.id); 
    setOpenConfirmation(false)}
}
>

</Confirmation>
</>
    ),
}      ,                        
]                         //^ "link" to the app controller to delete by id        base/delete/id



const {mutate} = useMutation(deleteCar, {onSuccess : () => {                                //{() => mutate(`${import.meta.env.VITE_API_URL}/delete/${params.row.id}`)}
    // setOpen(true)             //useMutation = change something
    queryClient.invalidateQueries({queryKey: ['cars']})
    setSnackBar(true);
} , 
onError: (err) => {
    console.error(err);
}
})                                                                                        

    
    if(!isSuccess){
        return<h2> Loading...</h2>
    }else if(error){
        return <h2> ERROR when fetching car... </h2>
    }else
         return(
            <>


            < DataGrid 
            rows={data}
            columns={columns}
            />

            <AddCar />

            <Snackbar open={showSnackBar}
            autoHideDuration={2000}
            onClose={() => setSnackBar(false)}
            message="Car was deleted."
            style={{background: 'red'}}
            />

            </>
        )
}

export default CarList