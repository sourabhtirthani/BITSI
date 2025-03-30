'use client'
import React from 'react'
import Link from 'next/link'
import { ToolTipHoverEffect } from './TooltipHoverEffect'

const InsuranceTermsButtonsAll = () => {
  return (
    <div className='md:self-center mt-20 max-md:mt-10 gap-10 flex max-lg:flex-col'>
                <div className='max-sm:gap-3 gap-10 flex'>
                <Link href='/terms-and-conditions'><ToolTipHoverEffect btnName='Purchase' hoverInfo='purchase an nft' /></Link>
                <Link href='/terms-and-conditions'><ToolTipHoverEffect btnName='Extend' hoverInfo='extend infortmation' /></Link>
                <Link href='/terms-and-conditions'> <ToolTipHoverEffect btnName='Policy' hoverInfo='Policy info' /></Link>
                </div>
                <div className='max-sm:gap-3 gap-10 flex'>
                <Link href='/terms-and-conditions'><ToolTipHoverEffect btnName='Claim' hoverInfo='Claim infortmation' /></Link>
                <Link href='/terms-and-conditions'><ToolTipHoverEffect btnName='Upgrade' hoverInfo='upgrade infortmation' /></Link>
                <Link href='/terms-and-conditions'> <ToolTipHoverEffect btnName='Unlock' hoverInfo='unlock infortmation' /></Link>
                </div>
            </div>
  )
}

export default InsuranceTermsButtonsAll