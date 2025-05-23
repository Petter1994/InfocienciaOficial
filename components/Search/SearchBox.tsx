'use client'
import {useState, ChangeEvent} from "react";
import {useRouter} from "next/navigation";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {Links, LinksSearch} from '@/data/links'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {getRoutes} from '@/utils/links'

export default function SearchBox() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);


    const [value, setValue] = useState<string | null>(LinksSearch[0]);
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        if (searchValue && searchValue in LinksSearch) {
            const route = getRoutes(searchValue);
            router.push(route)
        }

    }

    const handleRoute = (value: string) => {
        if (value) {
            const route = getRoutes(value);
            console.log(route)
            router.push(route)
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    }

    return (
        <>
            <IconButton
                aria-label='Buscar'
                onClick={toggleSearch}
                edge="end"
            >
                <SearchIcon/>
            </IconButton>

            {
                showSearch &&
                <Autocomplete
                    size='small'
                    freeSolo
                    disableClearable
                    sx={{width: '25ch', borderRadius: 4}}
                    value={value}
                    onChange={(event: any, newValue: string | null) => {
                        setValue(newValue);
                        handleRoute(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                        // handleRoute(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={LinksSearch}
                    renderInput={(params) =>
                        <TextField {...params}
                                   label="Buscar"

                        />
                    }
                />
            }
        </>
    )
}