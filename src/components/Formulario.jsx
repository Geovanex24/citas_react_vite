import {useState, useEffect} from "react"
import Error from "./Error";

const Formulario = ({patients, setPatients, patient, setPatient}) => {

    // STATE: FORM

    // const [pet, setPet] = useState('');
    // const [owner, setOwner] = useState('');
    // const [email, setEmail] = useState('');
    // const [date, setDate] = useState('');
    // const [symptomDescription, setSymptomDescription] = useState('');

    const [formData, setFormData] = useState({
        pet:'',
        owner: '',
        email: '',
        dischargeDate: '',
        symptoms: ''
    });

    // STATE: ERROR

    const [error, setError] = useState(false);

    // Se ejecutara cada vez que paciente canbie
    useEffect(() => {
        if(Object.keys(patient).length > 0){
            setFormData(patient);
        }
    }, [patient])

    // Se ejecutara solo una vex, cuando el componente esta listo
    // useEffect(() => {
    //     console.log("El componente esta listo!");
    // }, [])

    // GENERATE ID
    const generateId = () => {
        const random = Math.random().toString(36).substr(2);
        const date = Date.now().toString(36);

        return random + date;
    }
    
    // UPDATE STATE: FORMDATA
    const updateState = e => {
        setFormData({
            ...formData, 
            [e.target.id]: e.target.value
        })
    }
    
    // GET VALUES
    
    const {pet, owner, email, dischargeDate, symptoms} = formData;
    
    //FORM VALIDATION
    
    
    const handleSubmit = e => {
        e.preventDefault();

        if([pet, owner, email, dischargeDate, symptoms].includes('')){
            setError(true);
            return;
            //console.log("Existe al menos un campo vacio");
        }
        // console.log("Enviando form...");

        setError(false);

        // CREATE OR EDIT PATIENT

        if(patient.id) {
            // Editando el Registro
            formData.id = patient.id;

            const patientsUpdated = patients.map(patientState => patientState.id === 
            patient.id ? formData : patientState);

            setPatients(patientsUpdated);
            setPatient({});
        }else{
            // Nuevo Registro
            formData.id = generateId();
            setPatients([...patients, formData]);
        }



        // RESTART FORM
        setFormData({
            pet : '',
            owner : '',
            email : '',
            dischargeDate : '',
            symptoms : ''
        })
    }
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento 
            Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                {error && <Error> <p>Todos los campos son obligatorios</p></Error>}
                <div className="mb-5">
                    <label htmlFor="pet" className="block text-gray-700 uppercase font-bold">Nombre de la mascota</label>
                    <input 
                    id="pet" 
                    type="text" 
                    placeholder="Mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={pet}
                    onChange={updateState}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="owner" className="block text-gray-700 uppercase font-bold">Nombre del propietario</label>
                    <input 
                    id="owner" 
                    type="text" 
                    placeholder="Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={owner}
                    onChange={updateState}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input 
                    id="email" 
                    type="email" 
                    placeholder="Email de contacto del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={updateState}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="discharge-date" className="block text-gray-700 uppercase font-bold">Alta</label>
                    <input 
                    id="dischargeDate" 
                    type="date" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={dischargeDate}
                    onChange={updateState}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="symptoms" className="block text-gray-700 uppercase font-bold">Síntomas</label>
                    <textarea 
                    id="symptoms"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los síntomas"
                    value={symptoms}
                    onChange={updateState}
                    />
                </div>

                <input 
                type="submit" 
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                value={ patient.id ? 'Editar Paciente' : 'Agregar Paciente'}
                />
            </form>
        </div>
    )
}

export default Formulario
