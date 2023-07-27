import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Checkbox, Dropdown, Form, Icon, Label, Popup } from 'semantic-ui-react'
import { FormContext } from '../Provider/FormProvider';
import store from '..';
import validator from './Validator';
export default function FormInput(props) {

    const { display, page, visible, disableOnchange } = props
    const name = `${page}/${props.name}`
    const context = React.useContext(FormContext)
    const [formdata, setFormdata] = useState(context.formstates)
    const reduxstore = store.getState()
    const language = reduxstore?.Profile?.Language || 'en'
    const Attention = {
        en: "This Area Required",
        tr: "Bu alan zorunludur"
    }

    useEffect(() => {
        setFormdata({ ...context.formstates })
    }, [context.formstates])
    const handleKeyPress = (e) => {
        e.stopPropagation()
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const onKeyUpinput = (e) => {
        e.stopPropagation()
    }

    return (
        (validator.isBoolean(visible) ? visible : true) ?
            <Form.Field>
                <div className='flex flex-row m-2'>
                    {!props.dontshowlabel && <label className='text-[#000000de]'>{props.placeholder}{props.modal ? props.modal : null}</label>}
                    {display && <Icon name={display} />}
                    {props.required && <Popup
                        trigger={<Icon className='cursor-pointer' name='attention' />}
                        content={<Label color='red' ribbon>{Attention[language]}</Label>}
                        on='click'
                        hideOnScroll
                        position='left center'
                    />}
                    {props.attention && <Popup
                        trigger={<Icon link name='question circle' />}
                        content={<Label color='blue' ribbon>{props.attention}</Label>}
                        position='left center'
                        on='click'
                    />}
                </div>
                {!props.formtype ?
                    <Form.Input icon={display ? true : false} {...props} value={formdata[name] ? formdata[name] : ''} onChange={(e) => {
                        e.preventDefault()
                        if (disableOnchange) {
                            return
                        }
                        context.setFormstates({ ...formdata, [name]: e.target.value })
                    }} onKeyPress={(e) => { handleKeyPress(e) }} onKeyUp={onKeyUpinput} fluid >
                    </Form.Input>
                    :
                    <>
                        <>
                            {props.formtype === 'dropdown' ?
                                < Dropdown value={formdata[name] !== undefined ? formdata[name] : (props.multiple ? [] : '')} {...props} clearable search fluid selection
                                    onChange={(e, data) => {
                                        context.setFormstates({ ...formdata, [name]: data.value })

                                    }} />
                                : null}
                        </>
                        <>
                            {props.formtype === 'checkbox' ?
                                <Checkbox toggle className='m-2'
                                    checked={formdata[name] ? formdata[name] : false}
                                    onClick={(e) => {
                                        context.setFormstates({ ...formdata, [name]: formdata[name] ? !formdata[name] : true })
                                    }}
                                />
                                : null}
                        </>
                    </>
                }

            </Form.Field>
            : null
    )
}


