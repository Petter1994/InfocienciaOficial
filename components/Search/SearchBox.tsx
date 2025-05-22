'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {Links} from '@/data/links'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBox(){
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string>("");

    const handleSearch = () => {
        if(searchValue){

        }

    }

    return (
        <>
            <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
            />
            <FormControl sx={{ width: '25ch' }} variant="outlined">
                <OutlinedInput
                    size='small'
                    name='title'
                    className='rounded-3xl'
                    id="outlined-adornment-password"
                    type='text'
                    onChange={(e)=>setSearchValue(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label='Buscar'
                                onClick={handleSearch}
                                edge="end"
                            >
                                <SearchIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>


        </>
    )
}