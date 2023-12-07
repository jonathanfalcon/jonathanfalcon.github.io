import React from 'react'
import { motion } from 'framer-motion'

export const Animation = ({ component, children, className }) => {
    const Component = motion[component]

    return <Component className={className}>{children}</Component>
}
