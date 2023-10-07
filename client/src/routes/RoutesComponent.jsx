import React, { useState, useEffect } from 'react';
import VideoPrueba from '../pages/VideoPrueba.jsx';
import VideoPrueba2 from '../pages/VideoPrueba2.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Welcome from '../pages/Welcome.jsx';
import Stripe from '../pages/Stripe.jsx';
import VideoClase from '../pages/VideoClase.jsx';
import VideoDiario from '../pages/VideoDiario.jsx';
import Profile from '../pages/Profile.jsx';
import Home from '../pages/Home.jsx';
import NavComp from '../component/NavComp.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function RoutesComponent() {
	// State para guardar el ancho y alto de la pantalla
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	// State para guardar la relación de aspecto de la pantalla
	const [aspectRatio, setAspectRatio] = useState(width / height);

	// useEffect para actualizar el estado de ancho y alto de la pantalla y la relación de aspecto al redimensionar la pantalla
	useEffect(() => {
		function handleResize() {
			setTimeout(() => {
				setWidth(window.innerWidth);
				setHeight(window.innerHeight);
				setAspectRatio(width / height);
			}, 100);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [width, height]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<NavComp aspectRatio={aspectRatio} />}>
					<Route index element={<Home aspectRatio={aspectRatio} />} />
					<Route
						path='/profile'
						element={<Profile aspectRatio={aspectRatio} />}
					/>
					<Route
						path='/video-clase'
						element={<VideoClase aspectRatio={aspectRatio} />}
					/>
					<Route
						path='/video-diario'
						element={<VideoDiario aspectRatio={aspectRatio} />}
					/>
					<Route path='*' element={<Navigate replace to='/' />} />
				</Route>
				<Route path='/login' element={<Login aspectRatio={aspectRatio} />} />
				<Route
					path='/register'
					element={<Register aspectRatio={aspectRatio} />}
				/>
				<Route path='/welcome' element={<Welcome aspectRatio={aspectRatio} />} />
				<Route path='/stripe' element={<Stripe aspectRatio={aspectRatio} />} />
				<Route
					path='/video-prueba'
					element={<VideoPrueba aspectRatio={aspectRatio} />}
				/>
				<Route
					path='/video-prueba2'
					element={<VideoPrueba2 aspectRatio={aspectRatio} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default RoutesComponent;
