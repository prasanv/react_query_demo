import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Navbar({children}) {
  return (
    <div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/superheroes">Superheroes</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/rqsuperheroes">RQSuperheroes</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/rqsuperheroes/v1">RQSuperheroesV1</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/randomimages">RandomImages</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/parallelQueries">ParallelQueries</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/dynamicParallelQueries">DynamicParallelQueries</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/dependentQueries">DependentQueries</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/pagainatedQueries">Pagainated Queries</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/infiniteQueries">Infinite Queries</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/mutations">Mutations</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/mutationsResponseData">Add Query from Mutation Response Data </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/mutationsOptimisticUpdates">Mutation Optimistic Updates</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}
