import React, { useState } from 'react'
import './Barberregister.css'
import { useNavigate } from 'react-router-dom'
import Barberregister2 from './Barberregister2'
import ServiceItem from '../ServiceItem'
const Barberregister = () => {
    const [barber, setBarber] = useState({
        name: "",
        phone: "",
        website: "",
        type: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
        workinghoursfrom: "",
        workingdays: [],
        workinghoursto: "",
        zip: 0
    })
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState("Details");
    const [services, setServices] = useState([])
    const [sname, setSname] = useState("")
    const [price, setPrice] = useState("")
    const navigate = useNavigate();
    const onSnameChange = (e) => {
        console.log(e.target.value)
        setSname(e.target.value)
    }
    const onPriceChange = (e) => {
        console.log(e.target.value)
        setPrice(e.target.value)
    }
    const handleClick = () => {
        navigate("/barberhome");
    }
    const url="https://doormonk-mongo.onrender.com"
    const handelSubmit = async () => {
        const arr = selected.map(item => {
            return item.value
        })

        const response = await fetch(`${url}/api/barberauth/createbarber`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...barber, workingdays: arr, services: services })
        })
        const json = await response.json()
        if (json.success) {
            localStorage.setItem("token", json.authtoken)
            handleClick()
        }
        else {

        }
    }
    const onChange = (e) => {
        setBarber({
            ...barber,
            [e.target.name]: e.target.value
        })
    }
    const onNext = () => {
        setPage("Services")
    }
    const onPrev = () => {
        setPage("Details")
    }
    const onAdd = () => {
        var obj = {};
        obj[sname] = price;
        setServices(services.concat(obj))
        console.log(services)
    }
    return (
        <div className='container h-100'>
            <div className='row'>
                <div className='col-md-4'>
                    <h1 className='text-light'>Earn More. Earn Easily</h1>
                </div>

            </div>
            <div className='container my-3'>

                {page === "Details" ?
                    <>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="name" className="d-flex form-label text-light">Salon Name</label>
                                <input onChange={onChange} type="text" className="form-control" id="name" name='name' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="phone" className="d-flex form-label text-light">Phone</label>
                                <input onChange={onChange} name='phone' type="text" className="form-control" id="phone" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="website" className="d-flex form-label text-light">Website</label>
                                <input onChange={onChange} type="text" className="form-control" id="website" name='website' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="type" className="form-label text-light d-flex">Type</label>
                                <select onChange={onChange} id="type" name='type' className="form-select">
                                    <option value>Choose...</option>
                                    <option>Men</option>
                                    <option>Women</option>
                                    <option>Unisex</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="d-flex form-label text-light">Email</label>
                                <input onChange={onChange} type="email" className="form-control" id="email" name='email' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="password" className="d-flex form-label text-light">Password</label>
                                <input onChange={onChange} type="password" className="form-control" id="password" name='password' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="address" className="form-label d-flex text-light">Address</label>
                                <input onChange={onChange} type="text" className="form-control" id="address" name='address' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="city" className="form-label text-light d-flex">City</label>
                                <input onChange={onChange} type="text" className="form-control" id="city" name='city' />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="state" className="form-label text-light d-flex">State</label>
                                <select onChange={onChange} id="state" name='state' className="form-select">
                                    <option value>Choose...</option>
                                    <option>Uttarakhand</option>
                                    <option>Uttar Pradesh</option>
                                    <option>Delhi</option>
                                    <option>Bihar</option>
                                    <option>....</option>
                                    {/*"Use map in future"*/}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="zip" className="form-label text-light d-flex">Zip</label>
                                <input onChange={onChange} type="text" className="form-control" id="zip" name='zip' />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="workinghours" className="d-flex form-label text-light">Working Hours From</label>
                                <input onChange={onChange} className="form-control" type="time" id="workinghoursfrom" name="workinghoursfrom"></input>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="workinghours" className="d-flex form-label text-light">To</label>
                                <input onChange={onChange} className="form-control" type="time" id="workinghoursto" name="workinghoursto"></input>
                            </div>
                            <Barberregister2 selected={selected} setSelected={setSelected} />
                            <div className="col-12">
                                <button onClick={onNext} type="submit" className="btn btn-primary grow">Next</button>
                            </div>
                        </div>
                    </> :
                    <>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="servicename" className="d-flex form-label text-light">Service Name</label>
                                <input onChange={onSnameChange} type="text" className="form-control" id="servicename" name='servicename' />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="price" className="d-flex form-label text-light">Price</label>
                                <input onChange={onPriceChange} type="text" className="form-control" id="price" name='price' />
                            </div>
                            <div className="col-md-3">
                                <label hidden htmlFor="price" className="d-flex form-label text-light">Add Service</label>
                                <button onClick={onAdd} type="submit" className="btn btn-primary grow">Add</button>
                            </div>
                            <div className="col-6">
                                <button onClick={onPrev} type="submit" className="btn btn-primary grow">Previous</button>
                            </div>
                            <div className="col-6">
                                <button onClick={handelSubmit} type="submit" className="btn btn-primary grow">Register</button>
                            </div>
                        </div>
                        <div>
                            <div className='row my-3'>
                                <h2 style={{ color: "white" }}>Your Services</h2>
                                <div className='container mx-2' style={{ color: "white" }}>
                                    {services.length === 0 && "No added services"}
                                </div>
                                {services.map((service, i) => {
                                    return <ServiceItem key={i} price={Object.values(service)} service={Object.keys(service)[0]} />
                                })}</div>
                        </div>
                    </>}

            </div>

        </div>
    )
}

export default Barberregister