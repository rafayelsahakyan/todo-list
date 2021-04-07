import React, {useState} from 'react';
import {connect} from 'react-redux';
import { InputGroup, FormControl, DropdownButton, Button, Dropdown } from 'react-bootstrap';
import {textCut} from '../../helpers/utils';
import styles from './styleSearch.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as options from './options';
import {getTasks} from '../../store/action';
import searchIcon from './icon/searchIcon.svg'

function Search(props){

    const[filter, setShowFilter] = useState({
        showFilters:false
    });

    const [status, setStatus] = useState({
        value: ''
    })

    const [sort, setSort] = useState({
        value: ''
    })

    const [search, setSearch] = useState('')

    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    })

    const handleChangeDate = (value, name)=>{
        setDates({
            ...dates,
            [name]: value
        })
    }

    const handleSubmit = ()=>{
        const params = {};

        search && (params.search = search);
        status.value && (params.status = status.value);
        sort.value && (params.sort = sort.value);
    
        for(let key in dates){
            if(dates[key]){
                params[key] = dates[key].toLocaleDateString();
            }
        }
        props.getTasks(params);
    }

    return(
        <>
            <InputGroup className="mb-3">

                <FormControl 
                    placeholder="Search..."
                    style={{height:"40px"}}
                    onChange = {(event)=>setSearch(event.target.value)}
                />

                <DropdownButton
                    className={styles.btns}
                    as={InputGroup.Prepend}
                    variant="outline-primary"
                    title={status.value ? status.label:'Status'}
                    id="input-group-dropdown-1"
                >
                    {options.statusOptions.map((option, index)=>
                        <Dropdown.Item 
                            key = {index} 
                            active = {option.value === status.value} 
                            onClick = {()=>setStatus(option)}>
                                {option.label}
                        </Dropdown.Item>
                    )}
                </DropdownButton>
                
                <DropdownButton
                    className={styles.btns}
                    as={InputGroup.Prepend}
                    variant="outline-primary"
                    title={sort.value ? textCut(sort.label, 6):'Sort'}
                    id="input-group-dropdown-1"
                >
                    {options.sortOptions.map((option, index)=>
                        <Dropdown.Item 
                            key = {index} 
                            active = {option.value === sort.value} 
                            onClick = {()=>setSort(option)}>
                                {option.label}
                        </Dropdown.Item>
                    )}
                </DropdownButton>

                <InputGroup.Append>  
                    <Button 
                        variant="primary"
                        onClick={handleSubmit}
                    >
                        <img src={searchIcon} alt=""/>
                    </Button>
                </InputGroup.Append>

            </InputGroup>

            {filter.showFilters ? 
            <div>
                <div className={styles.datePickers}>
                {
                    options.dateOptions.map((option,index)=>
                        <div 
                            key = {index} 
                            className={styles.dateBlock}
                        >
                            <p className={styles.titleDate}>{option.label}</p>
                            <DatePicker
                                selected={dates[option.value]}
                                onChange={(value)=> handleChangeDate(value, option.value)}
                            />
                        </div>
                )}
                </div>
                <div className={styles.hideShow} onClick={()=>{setShowFilter({showFilters:false})}}>Hide filters</div>
            </div>: 
            <div className={styles.hideShow} onClick={()=>{setShowFilter({showFilters:true})}}>More filters</div>
        }
            
        </>
    )
}

const mapDispatchToProps = {
    getTasks: getTasks
}

export default connect(null, mapDispatchToProps)(Search)