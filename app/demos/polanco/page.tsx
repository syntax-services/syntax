'use client';
import React, { useState } from 'react';
import { Car, Currency, PageView } from './types/car';
import { CARS_DATA } from './data/cars';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { BespokePage } from './pages/BespokePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { ExhaustStudioModal } from './components/ExhaustStudioModal';
import { VIPBookingModal } from './components/VIPBookingModal';
import { BuildSheetModal } from './components/BuildSheetModal';
import { BespokeImportModal } from './components/BespokeImportModal';
import { VehicleComparatorDrawer } from './components/VehicleComparatorDrawer';

export default function PolancoDemoPage() {
  const [activeView, setActiveView] = useState<PageView>('home');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedMake, setSelectedMake] = useState<string>('All');

  // Modals & Comparator state
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [soundCar, setSoundCar] = useState<Car | null>(null);
  const [bookingCar, setBookingCar] = useState<Car | null>(null);
  const [buildSheetCar, setBuildSheetCar] = useState<Car | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState(false);

  // Vehicle Comparison state (Max 3 cars)
  const [comparedCars, setComparedCars] = useState<Car[]>([]);
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
  };

  const handlePlaySound = (car: Car) => {
    setSoundCar(car);
  };

  const handleOpenBookingModal = (car?: Car) => {
    setBookingCar(car || null);
    setIsBookingModalOpen(true);
  };

  const handleOpenBuildSheetModal = (car?: Car) => {
    setBuildSheetCar(car || CARS_DATA[0]);
  };

  const handleToggleCompare = (car: Car) => {
    setComparedCars((prev) => {
      const exists = prev.some((c) => c.id === car.id);
      if (exists) {
        return prev.filter((c) => c.id !== car.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), car];
      }
      return [...prev, car];
    });
  };

  const handleRemoveComparedCar = (carId: string) => {
    setComparedCars((prev) => prev.filter((c) => c.id !== carId));
  };

  const handleClearAllCompared = () => {
    setComparedCars([]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        comparedCount={comparedCars.length}
        onOpenComparator={() => setIsComparatorOpen(true)}
      />

      <main style={{ flexGrow: 1 }}>
        {activeView === 'home' && (
          <HomePage
            currency={currency}
            onSelectCar={handleSelectCar}
            onPlaySound={handlePlaySound}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenBuildSheetModal={handleOpenBuildSheetModal}
            onOpenBespokeModal={() => setIsBespokeModalOpen(true)}
            setActiveView={setActiveView}
            setSelectedMake={setSelectedMake}
          />
        )}

        {activeView === 'inventory' && (
          <InventoryPage
            currency={currency}
            setCurrency={setCurrency}
            onSelectCar={handleSelectCar}
            onPlaySound={handlePlaySound}
            onOpenBuildSheetModal={handleOpenBuildSheetModal}
            comparedCars={comparedCars}
            onToggleCompare={handleToggleCompare}
            onOpenComparator={() => setIsComparatorOpen(true)}
            selectedMake={selectedMake}
            setSelectedMake={setSelectedMake}
          />
        )}

        {activeView === 'bespoke' && (
          <BespokePage
            currency={currency}
            onOpenBespokeModal={() => setIsBespokeModalOpen(true)}
          />
        )}

        {activeView === 'about' && (
          <AboutPage setActiveView={setActiveView} />
        )}

        {activeView === 'contact' && (
          <ContactPage onOpenBookingModal={() => handleOpenBookingModal()} />
        )}
      </main>

      <Footer setActiveView={setActiveView} />

      {/* Side-by-Side Vehicle Comparator Drawer */}
      <VehicleComparatorDrawer
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        comparedCars={comparedCars}
        onRemoveCar={handleRemoveComparedCar}
        onClearAll={handleClearAllCompared}
        currency={currency}
        onSelectCar={handleSelectCar}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Conditionally Rendered Modals */}
      {selectedCar && (
        <VehicleDetailModal
          car={selectedCar}
          currency={currency}
          onClose={() => setSelectedCar(null)}
          onPlaySound={handlePlaySound}
          onOpenBookingModal={handleOpenBookingModal}
          onOpenBuildSheetModal={handleOpenBuildSheetModal}
          onToggleCompare={handleToggleCompare}
          isCompared={comparedCars.some((c) => c.id === selectedCar.id)}
        />
      )}

      {soundCar && (
        <ExhaustStudioModal
          car={soundCar}
          onClose={() => setSoundCar(null)}
        />
      )}

      {isBookingModalOpen && (
        <VIPBookingModal
          car={bookingCar}
          onClose={() => {
            setIsBookingModalOpen(false);
            setBookingCar(null);
          }}
        />
      )}

      {buildSheetCar && (
        <BuildSheetModal
          car={buildSheetCar}
          currency={currency}
          onClose={() => setBuildSheetCar(null)}
        />
      )}

      {isBespokeModalOpen && (
        <BespokeImportModal
          onClose={() => setIsBespokeModalOpen(false)}
        />
      )}
    </div>
  );
}
