import React, {useState} from 'react'
import { Modal, Button } from 'antd';


export default function PetModal() {
    const [visible, setvisible] = useState(false)
    const [location, setLocation] =  useState('')
    const [petName, setPetName] =  useState('')
    const [petType, setPetType] =  useState('dog')
    const [otherType, setotherType] =  useState('')
    const [age, setage] =  useState('')
    const handleOk = () => {
        let tempPetType =petType;
        if(petType==='other'){
            tempPetType = otherType;
        }
        let petObj = {location,petName, pettype:tempPetType ,age};
        console.log(petObj)
       setvisible(false)
      };
    return (
        <>
        <Button type="primary" onClick={()=>setvisible(true)}>
          Open Modal with customized footer
        </Button>
        <Modal
          visible={visible}
          title="Add pet"
          onOk={handleOk}
          onCancel={()=>setvisible(false)}
          footer={[
            <Button key="back" onClick={()=>setvisible(false)}>
              Return
            </Button>,
            <Button key="submit" type="primary"  onClick={handleOk}>
              Submit
            </Button>,
          ]}
        >
           <form>
                <div>
                    <h4>
                    <section> In this section you will list all the pet's characteristics, don't forget to be as true as possible in
                        order to find the best match for it!
                    </section>
                    </h4>
                </div>


            <div>
                <h4>
                <section>Upload at least three pictures of the pet you're trying to find a home for, consider that these images
                    are the first approach for the adopters so make them AWESOME, avoid including other pets or people in said pictures.
                </section>
                </h4>
            </div>
            <div>
                <label for="photo">Select photos</label>
                <input type="file" name="photo" id="photo" multiple/>
            </div>

            <div class="form-group">
                <p>What is the general area where you reside such as city, or neigborhood </p>
                <label for="location">Location</label>
                <input type="text" onChange={e=>setLocation(e.target.value)} name='location' id='location' placeholder="state/city/neighbourhood"/>
            </div>

            <div class="form-group">
                <p>Whats the little guy's name</p>
                <label for="petName">Name:</label>
                <input type="text" onChange={e=>setPetName(e.target.value)} placeholder="pet's name"/>
            </div>

            <div class="form-group">
                
                <p>What kind of pet do you have for an adopter?</p>
                <label for="petType">Choose pet type</label>
                <select onChange={e => setPetType(e.target.value)} name="petType" id="petType">
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
                </select>
                {petType==="other"?<input type="text" onChange={e=>setotherType(e.target.value)} placeholder="if 'OTHER' specify here..."/>:""}
            </div>
            <div class="form-group">
                <p>Please specify the age of the pet</p>
                <label  for="age">Choose age</label>
                <select onChange={e=>setage(e.target.value)} name="age" id="age">
                <option value="0-1">0 - 1 year</option>
                <option value="1-4"> 1 to 4 years </option>
                <option value="4-8"> 4 to 8 years</option>
                <option value="8+">More than 8 years</option>
                </select>
            </div>
            <div class="form-group">
                <p>Please indicate the size of the pet</p>
                <label for="petSize">Choose size</label>
                <select name="petSize" id="petSize">
                <option value="very small">Very small</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="huge">HUGE</option>
                </select>
            </div>
            <div class="form-group">
                <label for="gender">Pet's gender</label>
                <select name="gender" id="gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="apacheHelicopter">Apache Helicopter</option>
                </select>
            </div>

            <div class="form-group">
                <h4>
                <p>Here select all the attributes that best apply to the pet:</p>
                </h4>
                <p>Sheding and grooming</p>
                No Sheding: <input type="checkbox" name="attributes[]" value="No Sheding" /><br />
                Some Sheding: <input type="checkbox" name="attributes[]" value="Some Sheding" /><br />
                Heavy Sheding: <input type="checkbox" name="attributes[]" value="Heavy Sheding" /><br />
                No Gromming necessary: <input type="checkbox" name="attributes[]" value="No Gromming necessary" /><br />
                Some Gromming necessary: <input type="checkbox" name="attributes[]" value="Some Gromming necessary" /><br />
                Heavy Gromming necessary: <input type="checkbox" name="attributes[]" value="Heavy Gromming necessary" /><br />
            </div>

            <div class="form-group">
                <h5>
                <p>Personality</p>
                </h5>
                Needs lots of attention: <input type="checkbox" name="attributes[]" value="Needs lots of attention" /><br />
                Is independent: <input type="checkbox" name="attributes[]" value="Is independent" /><br />
                Is confident: <input type="checkbox" name="attributes[]" value="Is confident" /><br />
                Is shy or nervous: <input type="checkbox" name="attributes[]" value="Is shy or nervous" /><br />
                Is playful: <input type="checkbox" name="attributes[]" value="Is playful" /><br />
                Is relaxed: <input type="checkbox" name="attributes[]" value="Is relaxed" /><br />
                Is protective: <input type="checkbox" name="attributes[]" value="Is protective" /><br />
                Is quiet: <input type="checkbox" name="attributes[]" value="Is quiet" /><br />
                Makes some noise: <input type="checkbox" name="attributes[]" value="Makes some noise" /><br />
                Is noisy: <input type="checkbox" name="attributes[]" value="Is noisy" /><br />
                Is great with kids: <input type="checkbox" name="attributes[]" value="Is great with kids" /><br />
                Is not great with kids: <input type="checkbox" name="attributes[]" value="Is not great with kids" /><br />
                Is great with other pets: <input type="checkbox" name="attributes[]" value="Is great with other pets" /><br />
                Is not great with other pets: <input type="checkbox" name="attributes[]"
                value="Is not great with other pets" /><br />
            </div>

            <div class="form-group">
                <h5>
                <p>Training</p>
                </h5>
                Is house trained: <input type="checkbox" name="attributes[]" value="Is house trained" /><br />
                Has obidience training: <input type="checkbox" name="attributes[]" value="Has obidience training" /><br />
            </div>

            <div class="form-group">
                <p>Is your pet sterilized?</p>
                <input type="radio" name="sterilized" value="true"/> The pet is already sterilized <br/>
                <input type="radio" name="sterilized" value="false"/> The pet is not sterilized yet <br/>
            </div>

                <div class="form-group">
                    <p>Does the pet have any medical needs? If so, please specify:</p>
                    <input type="radio" name="medicalNeeds" value="false"/> The pet doesn't have any medical needs<br/>
                    <input type="radio" name="medicalNeeds" value="true"/> The pet has medical needs<br/>
                    <br/>
                    <input type="text" name="ifMedicalNeeds" placeholder="specify medical needs here..."/>
                </div>

                <button type="submit">Submit pet info</button>

            </form>
        </Modal>
      </>
    )
}
