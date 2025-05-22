'use client'
import {useState, ChangeEvent} from "react";
import {useRouter} from "next/navigation";
import InputAdornment from '@mui/material/InputAdornment';
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    }

    return (
        <>
            <div>
                <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
                <div>{`inputValue: '${inputValue}'`}</div>
                <br />
                <Autocomplete
                    size='small'
                    freeSolo
                    disableClearable
                    sx={{width: '25ch', borderRadius: 4}}
                    value={value}
                    onChange={(event: any, newValue: string | null) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={LinksSearch}
                    renderInput={(params) =>
                        <TextField {...params}
                                   label="Buscar"

                        />
                }
                />
            </div>
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
                    sx={{width: '25ch', borderRadius: 4}}
                    id="free-solo-2-demo"
                    disableClearable
                    options={Links.map((option) => option.name)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Buscar"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    type: 'search',
                                },
                            }}
                            onChange={handleChange}
                            onBlur={handleSearch}
                        />
                    )}

                />
            }
        </>
    )
}