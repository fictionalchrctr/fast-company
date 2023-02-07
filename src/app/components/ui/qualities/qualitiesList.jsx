import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities
  if (isLoading) return 'Loading'
  else {
    return (
      <>
        {qualities.map((quality) => (
          <Qualitie key={quality} id={quality} />
        ))}
      </>
    )
  }
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
