import React from 'react'

const Image = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} alt='new' />

export default Image