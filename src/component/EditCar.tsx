import { ChangeEvent, useState } from "react"
import { Car, CarEntry, CarResponse } from "../types"
import { Button } from "@mui/base"
import { Dialog, DialogActions, DialogTitle } from "@mui/material"
import CarDialogContent from "./CarDialogContent"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCar } from "../carApi"
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


type FormProps={
    Cardata: CarResponse
}

const EditCar = ({Cardata}: FormProps) => {

    const[car, setCar] = useState<Car>({
        id: 0,
        make:'',
        model:'',
        color:'',
        registerNumber:'',
        year:0,
        price:0
    })

    const[open,setOpen] = useState(false);

    const handleChange = () => {(event:ChangeEvent<HTMLInputElement>) => 
    {
        setCar({...car,[event.target.name]:event.target.value})
    }}

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setCar({
            id: 0,
            make: Cardata.make,
            model: Cardata.model,
            color: Cardata.color,
            registerNumber: Cardata.registerNumber,
            year: Cardata.year,
            price: Cardata.price
        })
        setOpen(true)
    }

    const queryClient = useQueryClient();

    const {mutate} = useMutation(updateCar,{
        onSuccess: () => {
            queryClient.invalidateQueries(['cars']);
        },
        onError: (err) => {
            console.error(err)
        }
    })

    const handleSave = () => {
        const url = Cardata.id;
        const carEntry: CarEntry = {car,url}
        mutate(carEntry)
        setCar({
            id: 0,
            make:'',
            model:'',
            color:'',
            registerNumber:'',
            year:0,
            price:0
        })
        setOpen(false);
    }

  return (
    <>
        <Button onClick={handleOpen}> <EditIcon/> </Button>
        <Dialog open = {open} onClose={handleClose}>
            <DialogTitle>  Edit Car </DialogTitle>
            
            <CarDialogContent car={car} handleChange={handleChange}/>

            <DialogActions>
            <Button color="error" variant="contained" onClick={handleClose}> <CancelIcon/> Cancel</Button>
            <Button color="primary" variant="contained" onClick={handleSave}> <CheckCircleIcon/> Save </Button>
            </DialogActions>

        </Dialog>
    </>
  )
}

export default EditCar